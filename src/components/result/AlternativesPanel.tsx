'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Variation {
  tone: string;
  eulogy: string;
}

interface AlternativesPanelProps {
  variations: Variation[];
}

export default function AlternativesPanel({ variations }: AlternativesPanelProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = variations[activeTab];

  async function handleCopy() {
    await navigator.clipboard.writeText(current.eulogy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const paragraphs = current.eulogy.split('\n').filter((p) => p.trim().length > 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#180026] text-lg">Alternative versions</h3>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="flex items-center gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy this version'}
        </Button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 border-b border-[#D4E9CA]">
        {variations.map((v, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`
              px-4 py-2 text-sm font-semibold border-b-2 transition-all duration-150 cursor-pointer
              ${
                activeTab === i
                  ? 'border-[#1D4641] text-[#1D4641]'
                  : 'border-transparent text-[#807388] hover:text-[#1D4641]'
              }
            `}
          >
            {v.tone}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-2xl bg-[#F7F6F3] border border-[#D4E9CA] p-6 sm:p-8">
        <div className="text-[#180026] leading-relaxed">
          {paragraphs.map((para, i) => (
            <p key={i} className={i > 0 ? 'mt-5' : ''}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
