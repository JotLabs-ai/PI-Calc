export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="text-sm text-gray-300">
            <p className="mb-2">
              © {new Date().getFullYear()} Browne Law Group. All rights reserved.
            </p>
            <p className="text-xs leading-relaxed max-w-3xl mx-auto">
              <strong>Disclaimer:</strong> The compensation estimates provided by this calculator are for informational purposes only
              and do not constitute legal advice. Actual settlement amounts may vary significantly based on the specific circumstances
              of your case, jurisdiction, and other factors. Consultation with a qualified attorney is recommended to evaluate your claim.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-600">
            <p className="text-xs text-gray-400">
              This calculator does not create an attorney-client relationship. By using this tool, you agree that any information
              provided is not confidential unless and until a formal attorney-client relationship is established.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
