import { useSearch } from '#/entities/search'
import { UiInput } from '#/shared/ui/UiInput'
import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { useDebounce } from 'usehooks-ts'
import { SearchList } from './search-list'

export const Search = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  const response = useSearch(debouncedValue)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <>
      <UiInput
        value={value}
        classNameContainer='max-w-[500px]'
        onChange={handleSearch}
        iconLeft={<IoSearch size='20px' />}
        placeholder='What do you want to listen to?'
      />
      <SearchList response={response} />
    </>
  )
}
