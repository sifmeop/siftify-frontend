import { Slider, SliderTypeMap, styled } from '@mui/material'

type Props = SliderTypeMap['props']

const CustomSlider = styled(Slider)({
  color: 'white',
  width: '100%',
  height: 5,
  '& .MuiSlider-thumb': {
    display: 'none',
    width: 18,
    height: 18,
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    }
  },
  '& .MuiSlider-track': {
    border: 'none'
  },
  '&:hover': {
    '& .MuiSlider-thumb': {
      display: 'block'
    },
    '& .MuiSlider-track': {
      backgroundColor: 'var(--color-primary)'
    }
  }
})

export const UiSlider = ({ ...props }: Props) => {
  return <CustomSlider {...props} />
}
