import { useUser } from '#/shared/hooks'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ActionMeta, OnChangeValue, StylesConfig } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useGetAllArtists } from './useGetAllArtists'

interface IOption {
  value: string
  label: string
  isFixed: boolean
}

const styles: StylesConfig<IOption, true> = {
  option: (base) => ({
    ...base,
    color: '#191919'
  }),
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
      : base
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base
  }
}

const orderOptions = (values: readonly IOption[]) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed))
}

export const SelectArtists = () => {
  const user = useUser()
  const { data, isLoading } = useGetAllArtists()
  const [options, setOptions] = useState<IOption[]>([])

  const { setValue, watch } = useFormContext()

  useEffect(() => {
    if (data?.length) {
      const filteredData = data.filter((artist) => artist.id !== user.artistId)

      const newOptions = filteredData.map((artist) => ({
        value: artist.id,
        label: artist.name,
        isFixed: false
      }))

      setOptions((prev) => [...prev, ...newOptions])
    }
  }, [data])

  const onChange = (
    newValue: OnChangeValue<IOption, true>,
    actionMeta: ActionMeta<IOption>
  ) => {
    switch (actionMeta.action) {
      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue.isFixed) {
          return
        }
        break
      case 'clear':
        newValue = options.filter((v) => v.isFixed)
        break
    }

    setValue('featuring', orderOptions(newValue))
  }

  const valueWatch = watch('featuring')

  return (
    <CreatableSelect
      isMulti
      styles={styles}
      isClearable={valueWatch?.some((v: IOption) => !v.isFixed)}
      isLoading={isLoading}
      value={valueWatch}
      onChange={onChange}
      closeMenuOnSelect={false}
      options={options}
    />
  )
}
