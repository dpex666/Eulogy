'use client';

import { useRef, useEffect, useState } from 'react';

interface EulogyDisplayProps {
  eulogy: string;
  deceasedName?: string;
  isPaid: boolean;
  isAuthed: boolean;
  eulogyId?: string;
  onEdit?: (newText: string) => void;
}

export default function EulogyDisplay({
  eulogy,
  deceasedName,
  isPaid,
  isAuthed,
  eulogyId,
  onEdit,
}: EulogyDisplayProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');

  // Set content once on mount only — never via dangerouslySetInnerHTML,
  // which causes React to reset the DOM on every re-render and breaks editing.
  useEffect(() => {
    if (editorRef.current) {
      const paragraphs = eulogy.split('\n').filter((p) => p.trim().length > 0);
      editorRef.current.innerHTML = paragraphs.join('<br/><br/>');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function persistEdit(text: string) {
    if (!eulogyId) return;
    try {
      const res = await fetch('/api/eulogies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: eulogyId, eulogy_text: text }),
      });
      setSaveStatus(res.ok ? 'saved' : 'failed');
    } catch {
      setSaveStatus('failed');
    }
  }

  function handleInput() {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText;
    if (onEdit) onEdit(text);

    if (isPaid && isAuthed && eulogyId) {
      setSaveStatus('saving');
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => persistEdit(text), 1500);
    }
  }

  const paragraphs = eulogy.split('\n').filter((p) => p.trim().length > 0);
  const canSave = isPaid && isAuthed && !!eulogyId;
  const needsSignIn = isPaid && !isAuthed;

  return (
    <div data-print-eulogy className="rounded-2xl bg-[#F7F6F3] border border-[#D4E9CA] p-8 sm:p-10">
      {deceasedName && (
        <p className="text-xs font-semibold text-[#48705B] uppercase tracking-widest mb-6">
          In memory of {deceasedName}
        </p>
      )}

      {isPaid ? (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          className="text-[#180026] leading-relaxed text-base sm:text-lg outline-none focus:ring-2 focus:ring-[#1D4641]/30 rounded-lg min-h-[200px] whitespace-pre-wrap"
        />
      ) : (
        <div className="text-[#180026] leading-relaxed text-base sm:text-lg">
          {paragraphs.map((para, i) => (
            <p key={i} className={i > 0 ? 'mt-5' : ''}>
              {para}
            </p>
          ))}
        </div>
      )}

      {canSave && (
        <p className="mt-4 text-xs text-[#807388]">
          {saveStatus === 'saving' && 'Saving...'}
          {saveStatus === 'saved' && 'Changes saved.'}
          {saveStatus === 'failed' && 'Could not save. Copy your text to keep it safe.'}
          {saveStatus === 'idle' && 'Click anywhere in the text above to edit it directly.'}
        </p>
      )}

      {needsSignIn && (
        <p className="mt-4 text-xs text-[#807388]">
          Click to edit. Sign in below to save your changes permanently.
        </p>
      )}
    </div>
  );
}
