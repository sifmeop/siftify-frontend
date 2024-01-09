interface Props {
  children: string
}

export const UiTitle = ({ children }: Props) => {
  return <h2 className='text-white font-bold text-2xl mb-2'>{children}</h2>
}
