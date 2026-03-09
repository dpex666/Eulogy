import { Input } from '@/components/ui/Input';
import { EulogyFormData } from '@/types/eulogy';

interface Props {
  data: EulogyFormData;
  onChange: (field: keyof EulogyFormData, value: string) => void;
}

export default function FormStep5({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-[#180026] mb-2">Almost ready</h2>
        <p className="text-[#807388]">
          Enter your email to receive your eulogy. We will send you a copy so you can come back to it any time.
        </p>
      </div>

      <Input
        label="Your email address"
        type="email"
        placeholder="your@email.com"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        required
        hint="We will never share your email. You can unsubscribe from any future messages at any time."
      />

      {/* What happens next */}
      <div className="rounded-xl bg-[#D4E9CA] p-5 flex flex-col gap-2">
        <p className="font-semibold text-[#1D4641] text-sm">What happens next</p>
        <ul className="flex flex-col gap-1.5 text-sm text-[#48705B]">
          <li>Your eulogy will be ready in about 30 seconds</li>
          <li>You can copy it straight to your clipboard</li>
          <li>Upgrade any time to edit it in the app and get alternative versions</li>
        </ul>
      </div>
    </div>
  );
}
