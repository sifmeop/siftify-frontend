import { useCallback, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

const baseStyle = {
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  border: '2px solid #eeeeee',
  borderRadius: '2',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const focusedStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

interface Props {
  name: string
  acceptFiles: 'image' | 'audio'
}

const typeFiles = {
  image: {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg']
  },
  audio: {
    'audio/mp3': ['.mp3']
  }
}

const titles = {
  image: 'Перетащите или выберите изображение',
  audio: 'Перетащите или выберите аудио'
}

export const UiDropzone = ({ name, acceptFiles }: Props) => {
  const { register, unregister, setValue, watch } = useFormContext()

  const onDrop = useCallback((droppedFiles: File[]) => {
    setValue(name, droppedFiles[0], { shouldValidate: true })
  }, [])

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      onDrop,
      accept: typeFiles[acceptFiles]
    })

  const file = watch(name)

  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <section className='container'>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{titles[acceptFiles]}</p>
      </div>
      {!!file && (
        <div className='mt-2'>
          {acceptFiles === 'image' ? (
            <img
              className='w-52 h-52 mx-auto'
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          ) : (
            <audio
              className='w-full'
              src={URL.createObjectURL(file)}
              controls
            />
          )}
        </div>
      )}
    </section>
  )
}
