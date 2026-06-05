'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Copy, Check, Sparkles, Lock, Printer } from 'lucide-react';

interface ActionButtonsProps {
  eulogy: string;
  isPaid: boolean;
  onGenerateAlternatives?: () => void;
  loadingAlternatives?: boolean;
}

export default function ActionButtons({
  eulogy,
  isPaid,
  onGenerateAlternatives,
  loadingAlternatives,
}: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(eulogy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = eulogy;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex flex-wrap gap-3">
      {/* Print button - available to all */}
      <Button
        variant="ghost"
        onClick={handlePrint}
        className="flex items-center gap-2 print:hidden"
      >
        <Printer className="h-4 w-4" />
        Print eulogy
      </Button>

      {/* Copy button - available to all */}
      <Button
        variant={copied ? 'secondary' : 'primary'}
        onClick={handleCopy}
        className="flex items-center gap-2"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy eulogy
          </>
        )}
      </Button>

      {/* Generate alternatives - paid only */}
      {isPaid ? (
        <Button
          variant="ghost"
          onClick={onGenerateAlternatives}
          loading={loadingAlternatives}
          className="flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          {loadingAlternatives ? 'Generating...' : 'Get alternative versions'}
        </Button>
      ) : (
        <Button
          variant="ghost"
          disabled
          className="flex items-center gap-2 opacity-60 cursor-not-allowed"
          title="Upgrade to Pro to get alternative versions"
        >
          <Lock className="h-4 w-4" />
          Get alternative versions
        </Button>
      )}
    </div>
  );
}
