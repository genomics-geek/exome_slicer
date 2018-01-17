# -*- coding: utf-8
import logging

from django.core.management import BaseCommand

from exome_slicer.quality_stats.models import QualityStat


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Load stats file to Exome Slicer'

    def add_arguments(self, parser):
        parser.add_argument('input', help='Full path to stats file to parse')

    def handle(self, *args, **options):
        input_file = open(options['input'], 'r')

        header = input_file.readline()
        header = header.replace('#', '')  # Repalce # from header line if it exists

        # Parse column headers
        columns = header.strip().split('\t')
        chromosome_idx = columns.index('chr')
        start_idx = columns.index('start')
        end_idx = columns.index('end')
        transcript_cds_exon_idx = columns.index('transcript_cds_exon')
        gene_idx = columns.index('gene')
        coord_idx = columns.index('coord')
        baits_idx = columns.index('baits')
        bases_baits_idx = columns.index('bases_baits')
        exon_length_idx = columns.index('exon_length')
        pct_exon_bait_idx = columns.index('pct_exon_bait')
        avg_mq_idx = columns.index('avg_mq')
        min_mq_idx = columns.index('min_mq')
        max_mq_idx = columns.index('max_mq')
        avg_cov_idx = columns.index('avg_cov')
        min_cov_idx = columns.index('min_cov')
        max_cov_idx = columns.index('max_cov')

        skipped = 0
        for index, line in enumerate(input_file):
            data = line.strip().split('\t')

            # Validations - Catch Exceptions
            if len(data[transcript_cds_exon_idx].strip().split('.')) == 1:
                logging.warning('Skipping: {0}'.format(line.strip()))
                skipped += 1
                continue

            if data[coord_idx].startswith('chrhr'):
                logging.warning('Skipping: {0}'.format(line.strip()))
                skipped += 1
                continue

            gene = data[gene_idx].upper()
            transcript_data = data[transcript_cds_exon_idx].strip().split('.')
            transcript = transcript_data[0]
            version_data = transcript_data[1].strip().split('_')
            cds_exon = int(version_data[2])
            avg_mq = round(float(data[avg_mq_idx]), 3) if data[avg_mq_idx] != 'NA' else None
            min_mq = round(float(data[min_mq_idx]), 3) if data[min_mq_idx] != 'NA' else None
            max_mq = round(float(data[max_mq_idx]), 3) if data[max_mq_idx] != 'NA' else None

            QualityStat.objects.create(
                chromosome=data[chromosome_idx],
                start=int(data[start_idx]),
                end=int(data[end_idx]),
                region=data[coord_idx],
                gene=gene,
                transcript=transcript,
                cds_exon=cds_exon,
                number_of_baits=int(data[baits_idx]),
                bases_covered_by_baits=int(data[bases_baits_idx]),
                number_of_bases_in_region=int(data[exon_length_idx]),
                pct_bases_covered_by_baits=round(float(data[pct_exon_bait_idx]), 3),
                avg_mapping_quality=avg_mq,
                min_mapping_quality=min_mq,
                max_mapping_quality=max_mq,
                avg_coverage=round(float(data[avg_cov_idx]), 3),
                min_coverage=round(float(data[min_cov_idx]), 3),
                max_coverage=round(float(data[max_cov_idx]), 3),
            )

        logging.warning("Skipped: {0} out of: {1} rows".format(skipped, index + 1))
