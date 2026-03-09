import { Textarea } from '@/components/ui/Input';
import { EulogyFormData } from '@/types/eulogy';

interface Props {
  data: EulogyFormData;
  onChange: (field: keyof EulogyFormData, value: string) => void;
}

export default function FormStep3({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-[#180026] mb-2">Who they were</h2>
        <p className="text-[#807388]">
          Help us capture the person behind the name. All fields are optional but make a big difference.
        </p>
      </div>

      <Textarea
        label="Personality and character"
        placeholder="e.g. She was the loudest laugh in any room. He was stubborn as anything but would give you the shirt off his back..."
        value={data.personalityTraits}
        onChange={(e) => onChange('personalityTraits', e.target.value)}
        hint="Think about the qualities the people at the service would all agree on."
      />

      <Textarea
        label="Achievements and proud moments"
        placeholder="e.g. 40 years at the same company, raised four children on her own, built the family home with his own hands..."
        value={data.achievements}
        onChange={(e) => onChange('achievements', e.target.value)}
        hint="These do not have to be big public achievements. Personal ones often matter more."
      />

      <Textarea
        label="Family and the people they loved"
        placeholder="e.g. Survived by her husband Ron, three children and seven grandchildren who called her Nan..."
        value={data.familyInfo}
        onChange={(e) => onChange('familyInfo', e.target.value)}
        hint="You can include names or keep it general. Either works."
      />
    </div>
  );
}
