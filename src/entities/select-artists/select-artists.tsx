import { useUser } from '#/shared/hooks'
import { useEffect, useState } from 'react'
import { ActionMeta, OnChangeValue, StylesConfig } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useGetAllArtists } from './useGetAllArtists'
import { useUploadTrackStore } from '#/shared/store'

export interface IOption {
  value: string
  label: string
  isFixed: boolean
  __isNew__?: boolean
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

interface Props {
  trackId: string
}

export const SelectArtists = ({ trackId }: Props) => {
  const user = useUser()
  const { data, isLoading } = useGetAllArtists()
  const [options, setOptions] = useState<IOption[]>([])
  const [value, setValue] = useState<IOption[]>([
    {
      value: user.artist!.id,
      label: user.artist!.name,
      isFixed: true
    }
  ])
  const setChangeFeaturing = useUploadTrackStore(
    (state) => state.setChangeFeaturing
  )

  useEffect(() => {
    if (data?.length) {
      const filteredData = data.filter(
        (artist) => artist.name !== user.artist!.name
      )

      const newOptions = filteredData.map((artist) => ({
        value: artist.id,
        label: artist.name,
        isFixed: false
      }))

      newOptions.push({
        value: user.artist!.id,
        label: user.artist!.name,
        isFixed: true
      })

      setOptions(newOptions)
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
    setValue(orderOptions(newValue))
    setChangeFeaturing(trackId, orderOptions(newValue))
  }

  return (
    <CreatableSelect
      isMulti
      styles={styles}
      isClearable={value?.some((v: IOption) => !v.isFixed)}
      value={value}
      isLoading={isLoading}
      onChange={onChange}
      closeMenuOnSelect={false}
      options={options}
    />
  )
}
