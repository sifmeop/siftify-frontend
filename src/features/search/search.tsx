import { useSearch } from '#/entities/search'
import { UiInput } from '#/shared/ui/UiInput'
import { Box } from '@mui/material'
import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { useDebounce } from 'usehooks-ts'

export const Search = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  const { data } = useSearch(debouncedValue)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <Box className='max-w-[500px]'>
      <UiInput
        value={value}
        onChange={handleSearch}
        iconLeft={<IoSearch size='20px' />}
        placeholder='What do you want to listen to?'
      />
      {data?.map((item: any) => <div key={item.id}>{item.name}</div>)}
    </Box>
  )
}
