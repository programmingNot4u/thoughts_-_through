from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from api.models import LegalDocument


class Command(BaseCommand):
    help = 'Populate Legal Documents with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Populating Legal Documents...')
        
        documents_data = [
            {
                'title': 'Registration Certificate',
                'description': 'Official registration certificate issued by the Registrar of Joint Stock Companies and Firms (RJSC) for Thoughts & Thorough Research Center.',
                'document_type': 'Certificate',
                'year': '2023',
                'issued_by': 'Registrar of Joint Stock Companies and Firms (RJSC)',
                'issue_date': '2023-01-15',
                'expiry_date': None,
                'is_active': True,
                'order': 1,
            },
            {
                'title': 'Tax Identification Number (TIN) Certificate',
                'description': 'Tax Identification Number certificate issued by the National Board of Revenue (NBR) for tax purposes.',
                'document_type': 'Certificate',
                'year': '2023',
                'issued_by': 'National Board of Revenue (NBR)',
                'issue_date': '2023-02-01',
                'expiry_date': None,
                'is_active': True,
                'order': 2,
            },
            {
                'title': 'Trade License',
                'description': 'Trade license issued by the local city corporation for conducting research and consultancy services.',
                'document_type': 'License',
                'year': '2023',
                'issued_by': 'Dhaka City Corporation',
                'issue_date': '2023-01-20',
                'expiry_date': '2024-12-31',
                'is_active': True,
                'order': 3,
            },
            {
                'title': 'Annual Audit Report 2023',
                'description': 'Comprehensive annual audit report for the fiscal year 2023, prepared by certified public accountants.',
                'document_type': 'Audit Report',
                'year': '2023',
                'issued_by': 'Chartered Accountants Firm',
                'issue_date': '2024-03-31',
                'expiry_date': None,
                'is_active': True,
                'order': 1,
            },
            {
                'title': 'Research Ethics Approval',
                'description': 'Ethics approval certificate for conducting research studies involving human subjects, issued by the Institutional Review Board.',
                'document_type': 'Approval',
                'year': '2023',
                'issued_by': 'Institutional Review Board (IRB)',
                'issue_date': '2023-03-10',
                'expiry_date': '2025-03-10',
                'is_active': True,
                'order': 1,
            },
            {
                'title': 'ISO 9001:2015 Quality Management Certificate',
                'description': 'International Organization for Standardization certificate for quality management systems in research and consultancy services.',
                'document_type': 'Certificate',
                'year': '2023',
                'issued_by': 'International Organization for Standardization',
                'issue_date': '2023-05-15',
                'expiry_date': '2026-05-15',
                'is_active': True,
                'order': 3,
            },
            {
                'title': 'Data Protection Compliance Certificate',
                'description': 'Certificate of compliance with data protection regulations and privacy standards for research data handling.',
                'document_type': 'Certificate',
                'year': '2023',
                'issued_by': 'Data Protection Authority',
                'issue_date': '2023-06-01',
                'expiry_date': '2025-06-01',
                'is_active': True,
                'order': 4,
            },
            {
                'title': 'Bank Account Opening Certificate',
                'description': 'Certificate confirming the opening of organizational bank accounts for financial transactions and operations.',
                'document_type': 'Certificate',
                'year': '2023',
                'issued_by': 'Commercial Bank',
                'issue_date': '2023-01-25',
                'expiry_date': None,
                'is_active': True,
                'order': 5,
            },
            {
                'title': 'Annual Audit Report 2024',
                'description': 'Comprehensive annual audit report for the fiscal year 2024, prepared by certified public accountants with detailed financial statements.',
                'document_type': 'Audit Report',
                'year': '2024',
                'issued_by': 'Chartered Accountants Firm',
                'issue_date': '2025-03-31',
                'expiry_date': None,
                'is_active': True,
                'order': 1,
            },
            {
                'title': 'Research Grant Approval',
                'description': 'Approval certificate for receiving research grants from national funding agencies for conducting research projects.',
                'document_type': 'Approval',
                'year': '2024',
                'issued_by': 'National Research Foundation',
                'issue_date': '2024-02-15',
                'expiry_date': '2026-02-15',
                'is_active': True,
                'order': 2,
            },
            {
                'title': 'Environmental Compliance Certificate',
                'description': 'Certificate of compliance with environmental regulations and standards for research activities.',
                'document_type': 'Certificate',
                'year': '2024',
                'issued_by': 'Department of Environment',
                'issue_date': '2024-04-10',
                'expiry_date': '2026-04-10',
                'is_active': True,
                'order': 1,
            },
            {
                'title': 'Health Research License',
                'description': 'License to conduct health-related research studies and clinical investigations.',
                'document_type': 'License',
                'year': '2024',
                'issued_by': 'Directorate General of Health Services',
                'issue_date': '2024-03-20',
                'expiry_date': '2027-03-20',
                'is_active': True,
                'order': 1,
            },
            {
                'title': 'International Collaboration Agreement Approval',
                'description': 'Approval for international research collaboration agreements with foreign institutions and organizations.',
                'document_type': 'Approval',
                'year': '2024',
                'issued_by': 'Ministry of Education',
                'issue_date': '2024-05-05',
                'expiry_date': None,
                'is_active': True,
                'order': 3,
            },
            {
                'title': 'Professional Indemnity Insurance Certificate',
                'description': 'Certificate of professional indemnity insurance coverage for research and consultancy services.',
                'document_type': 'Certificate',
                'year': '2024',
                'issued_by': 'Insurance Company',
                'issue_date': '2024-01-10',
                'expiry_date': '2025-01-10',
                'is_active': True,
                'order': 2,
            },
            {
                'title': 'Export-Import License',
                'description': 'License for importing research equipment and materials required for research activities.',
                'document_type': 'License',
                'year': '2024',
                'issued_by': 'Ministry of Commerce',
                'issue_date': '2024-02-28',
                'expiry_date': '2025-12-31',
                'is_active': True,
                'order': 2,
            },
            {
                'title': 'Social Research Ethics Approval',
                'description': 'Ethics approval for conducting social research studies involving vulnerable populations and communities.',
                'document_type': 'Approval',
                'year': '2024',
                'issued_by': 'Social Research Ethics Committee',
                'issue_date': '2024-04-20',
                'expiry_date': '2026-04-20',
                'is_active': True,
                'order': 4,
            },
            {
                'title': 'Financial Audit Report Q1 2024',
                'description': 'Quarterly financial audit report for the first quarter of 2024, prepared by certified auditors.',
                'document_type': 'Audit Report',
                'year': '2024',
                'issued_by': 'Chartered Accountants Firm',
                'issue_date': '2024-04-30',
                'expiry_date': None,
                'is_active': True,
                'order': 2,
            },
            {
                'title': 'Financial Audit Report Q2 2024',
                'description': 'Quarterly financial audit report for the second quarter of 2024, prepared by certified auditors.',
                'document_type': 'Audit Report',
                'year': '2024',
                'issued_by': 'Chartered Accountants Firm',
                'issue_date': '2024-07-31',
                'expiry_date': None,
                'is_active': True,
                'order': 3,
            },
            {
                'title': 'Research Publication License',
                'description': 'License for publishing research findings and distributing research publications.',
                'document_type': 'License',
                'year': '2024',
                'issued_by': 'Ministry of Information',
                'issue_date': '2024-06-15',
                'expiry_date': '2027-06-15',
                'is_active': True,
                'order': 3,
            },
            {
                'title': 'Data Collection Authorization',
                'description': 'Authorization certificate for collecting primary and secondary data for research purposes.',
                'document_type': 'Approval',
                'year': '2024',
                'issued_by': 'Bureau of Statistics',
                'issue_date': '2024-05-20',
                'expiry_date': '2025-05-20',
                'is_active': True,
                'order': 5,
            },
        ]

        created_count = 0
        updated_count = 0

        for doc_data in documents_data:
            issue_date_str = doc_data.pop('issue_date')
            expiry_date_str = doc_data.pop('expiry_date', None)
            
            # Check if document already exists
            document, created = LegalDocument.objects.get_or_create(
                title=doc_data['title'],
                year=doc_data['year'],
                defaults={
                    **doc_data,
                    'issue_date': datetime.strptime(issue_date_str, '%Y-%m-%d').date() if issue_date_str else None,
                    'expiry_date': datetime.strptime(expiry_date_str, '%Y-%m-%d').date() if expiry_date_str else None,
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {document.title} ({document.year})'))
            else:
                # Update existing document
                for key, value in doc_data.items():
                    setattr(document, key, value)
                document.issue_date = datetime.strptime(issue_date_str, '%Y-%m-%d').date() if issue_date_str else None
                document.expiry_date = datetime.strptime(expiry_date_str, '%Y-%m-%d').date() if expiry_date_str else None
                document.save()
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'Updated: {document.title} ({document.year})'))

        self.stdout.write(self.style.SUCCESS(f'\nSuccessfully populated Legal Documents!'))
        self.stdout.write(self.style.SUCCESS(f'Created: {created_count} documents'))
        self.stdout.write(self.style.SUCCESS(f'Updated: {updated_count} documents'))
        self.stdout.write(self.style.SUCCESS('You can now view legal documents in Django admin and the frontend.'))

