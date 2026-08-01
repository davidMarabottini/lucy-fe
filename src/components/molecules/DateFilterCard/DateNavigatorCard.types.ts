export interface DateNavigatorCardProps {
  selectedDate: string;
  onSelectDate: (date: Date | null) => void;
  onNextDay: () => void;
  onPreviousDay: () => void;
  label: string;
  additionalClassName?: string;
}
