import { Input, Textarea } from '@/components/ui/Input';
import { EulogyFormData } from '@/types/eulogy';

interface Props {
  data: EulogyFormData;
  onChange: (field: keyof EulogyFormData, value: string) => void;
}

const MEMORIES_MIN = 60;

export default function FormStep2({ data, onChange }: Props) {
  const memoriesLen = data.memories.trim().length;
  const remaining = MEMORIES_MIN - memoriesLen;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-[#180026] mb-2">Your relationship and memories</h2>
        <p className="text-[#807388]">
          Tell us who you are to them, and the moments you want people to remember.
        </p>
      </div>

      <Input
        label="Your relationship to them"
        placeholder="e.g. daughter, close friend, son-in-law, work colleague"
        value={data.relationship}
        onChange={(e) => onChange('relationship', e.target.value)}
        required
        hint="This helps the eulogy feel like it is coming from you personally."
      />

      <div className="flex flex-col gap-1">
        <Textarea
          label="Key memories and stories"
          placeholder="Share the moments that meant the most. It does not have to be polished. Write it how you would tell a friend..."
          value={data.memories}
          onChange={(e) => onChange('memories', e.target.value)}
          required
          className="min-h-[160px]"
          hint="The more specific the memory, the more personal the eulogy. A single clear story is worth more than a list of general traits."
        />
        {remaining > 0 && (
          <p className="text-xs text-amber-600">
            Add {remaining} more character{remaining !== 1 ? 's' : ''} to continue. Try including a specific moment or story.
          </p>
        )}
      </div>
    </div>
  );
}
