import {
  Box,
  Fade,
  IconButton,
  Modal,
  SxProps,
  Theme,
  Typography
} from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 450,
  width: '100%',
  maxHeight: '90dvh',
  bgcolor: '#191919',
  border: '2px solid #191919',
  boxShadow: 24,
  p: 4
}

export const UiModal = ({ isOpen, onClose, title, children }: Props) => {
  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition>
      <Fade in={isOpen}>
        <Box sx={style}>
          <Typography variant='h6' component='h2' sx={{ mb: 2 }}>
            {title}
          </Typography>
          <IconButton
            sx={{ position: 'absolute', top: 12, right: 12 }}
            onClick={onClose}>
            <AiOutlineClose fill='#ffffff' />
          </IconButton>
          {children}
        </Box>
      </Fade>
    </Modal>
  )
}
