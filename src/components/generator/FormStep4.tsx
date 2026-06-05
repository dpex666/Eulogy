import { EulogyFormData } from '@/types/eulogy';

interface Props {
  data: EulogyFormData;
  onChange: (field: keyof EulogyFormData, value: string) => void;
}

const tones: { value: EulogyFormData['tone']; label: string; description: string }[] = [
  {
    value: 'warm',
    label: 'Warm and personal',
    description: 'Conversational and full of heart. Reads like it came from someone who loved them.',
  },
  {
    value: 'formal',
    label: 'Formal and dignified',
    description: 'Respectful and composed. Suitable for a more traditional service.',
  },
  {
    value: 'religious',
    label: 'Faith-centred',
    description: 'Draws on spiritual themes and the comfort of faith.',
  },
  {
    value: 'secular',
    label: 'Non-religious',
    description: 'Focused on the life lived and the legacy left, without religious references.',
  },
];

const lengths: { value: EulogyFormData['length']; label: string; duration: string }[] = [
  { value: 'short', label: 'Short', duration: 'About 2 minutes' },
  { value: 'medium', label: 'Medium', duration: 'About 4 to 5 minutes' },
  { value: 'long', label: 'Long', duration: 'About 7 to 8 minutes' },
];

export default function FormStep4({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-[#180026] mb-2">Tone and length</h2>
        <p className="text-[#807388]">
          Choose the style that best fits the person and the service.
        </p>
      </div>

      {/* Tone */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-[#180026]">Tone</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tones.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange('tone', t.value)}
              className={`
                text-left rounded-xl border-2 p-4 transition-all duration-150 cursor-pointer
                ${
                  data.tone === t.value
                    ? 'border-[#1D4641] bg-[#D4E9CA]'
                    : 'border-[#D4E9CA] bg-white hover:border-[#48705B]'
                }
              `}
            >
              <p className="font-semibold text-[#180026] mb-1">{t.label}</p>
              <p className="text-sm text-[#807388]">{t.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Length */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-[#180026]">Length</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {lengths.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => onChange('length', l.value)}
              className={`
                text-center rounded-xl border-2 p-4 transition-all duration-150 cursor-pointer
                ${
                  data.length === l.value
                    ? 'border-[#1D4641] bg-[#D4E9CA]'
                    : 'border-[#D4E9CA] bg-white hover:border-[#48705B]'
                }
              `}
            >
              <p className="font-semibold text-[#180026]">{l.label}</p>
              <p className="text-xs text-[#807388] mt-1">{l.duration}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
