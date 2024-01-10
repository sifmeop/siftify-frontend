import { cn } from '#/shared/lib'

type Props = React.LabelHTMLAttributes<HTMLLabelElement>

export const UiLabel = ({ className, children, ...props }: Props) => {
  return (
    <label
      className={cn('inline-block text-sm text-[#CDD2DB]', className)}
      {...props}>
      {children}
    </label>
  )
}
