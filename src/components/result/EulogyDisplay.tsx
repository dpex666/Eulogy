'use client';

import { useRef } from 'react';

interface EulogyDisplayProps {
  eulogy: string;
  deceasedName?: string;
  isPaid: boolean;
  onEdit?: (newText: string) => void;
}

export default function EulogyDisplay({
  eulogy,
  deceasedName,
  isPaid,
  onEdit,
}: EulogyDisplayProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  function handleInput() {
    if (editorRef.current && onEdit) {
      onEdit(editorRef.current.innerText);
    }
  }

  const paragraphs = eulogy.split('\n').filter((p) => p.trim().length > 0);

  return (
    <div className="rounded-2xl bg-[#F7F6F3] border border-[#D4E9CA] p-8 sm:p-10">
      {deceasedName && (
        <p className="text-xs font-semibold text-[#48705B] uppercase tracking-widest mb-6">
          In memory of {deceasedName}
        </p>
      )}

      {isPaid ? (
        // Paid: editable rich text
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          className="text-[#180026] leading-relaxed text-base sm:text-lg outline-none focus:ring-2 focus:ring-[#1D4641]/30 rounded-lg min-h-[200px] whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: paragraphs.join('<br/><br/>') }}
        />
      ) : (
        // Free: read-only
        <div className="text-[#180026] leading-relaxed text-base sm:text-lg">
          {paragraphs.map((para, i) => (
            <p key={i} className={i > 0 ? 'mt-5' : ''}>
              {para}
            </p>
          ))}
        </div>
      )}

      {isPaid && (
        <p className="mt-6 text-xs text-[#807388]">
          Click anywhere in the text above to edit it directly.
        </p>
      )}
    </div>
  );
}
