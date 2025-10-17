export default function Footer() {
  return (
    <footer className="bg-[color:var(--dark)] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="text-sm text-gray-300">
            <p className="mb-2">
              © {new Date().getFullYear()} Browne Law Group. All rights reserved.
            </p>
            <div className="text-xs leading-relaxed max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg">
              <p className="font-semibold mb-3 text-white">Disclaimer:</p>
              <p className="text-gray-300">
                Personal injury calculator (&quot;PIC&quot;) is an estimate of the value of a given personal
                injury matter. It is not a guarantee that if you retain Browne Law Group that your
                case will have the exact or approximate value displayed by this PIC. The PIC also
                does not consider whether the bad actor that injured you has insurance, funds, or
                the means to pay the estimate provided by the PIC. There are a myriad intangible
                factors such as credibility, presentation, criminal history, number of family members,
                closeness of relatives, criminal history, age, gender and other nuanced factors that
                play into value that cannot be electronically factored in to the PIC.
              </p>
            </div>
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
