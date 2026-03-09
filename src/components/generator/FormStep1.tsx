import { Input } from '@/components/ui/Input';
import { EulogyFormData } from '@/types/eulogy';

interface Props {
  data: EulogyFormData;
  onChange: (field: keyof EulogyFormData, value: string) => void;
}

export default function FormStep1({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-[#180026] mb-2">About the person</h2>
        <p className="text-[#807388]">
          Start with the basics. The more detail you share, the more personal the eulogy will be.
        </p>
      </div>

      <Input
        label="Full name"
        placeholder="e.g. Margaret Anne Collins"
        value={data.deceasedName}
        onChange={(e) => onChange('deceasedName', e.target.value)}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Age (optional)"
          placeholder="e.g. 78"
          value={data.age}
          onChange={(e) => onChange('age', e.target.value)}
          type="text"
          inputMode="numeric"
        />
        <Input
          label="Hometown or city (optional)"
          placeholder="e.g. Melbourne, VIC"
          value={data.hometown}
          onChange={(e) => onChange('hometown', e.target.value)}
        />
      </div>

      <Input
        label="Occupation or life role (optional)"
        placeholder="e.g. Nurse, retired teacher, devoted mother of four"
        value={data.occupation}
        onChange={(e) => onChange('occupation', e.target.value)}
        hint="You can be descriptive here. 'Farmer and community leader' works just as well as a job title."
      />
    </div>
  );
}
