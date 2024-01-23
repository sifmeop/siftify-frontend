import { ErrorMessage } from '@hookform/error-message'
import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { CiImageOn } from 'react-icons/ci'
import { toast } from 'react-toastify'

const getBorderColor = (
  isFocused: boolean,
  isDragAccept: boolean,
  isDragReject: boolean
) => {
  if (isDragAccept) {
    return '#00e676'
  }
  if (isDragReject) {
    return '#ff1744'
  }
  if (isFocused) {
    return '#2196f3'
  }
  return '#eeeeee'
}

const name = 'cover'

export const UiDropzoneCover = () => {
  const {
    register,
    unregister,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()

  const onDrop = useCallback((droppedFiles: File[]) => {
    setValue(name, droppedFiles[0], { shouldValidate: true })
  }, [])

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      onDropRejected(event) {
        const messages: string[] = []
        event.forEach((e) => {
          e.errors.forEach((error) => {
            const message = 'Слишком много файлов'
            if (error.code === 'too-many-files') {
              if (!messages.includes(message)) {
                messages.push(message)
              }
            } else if (error.code === 'file-invalid-type') {
              const message = 'Недопустимый тип файла'
              if (!messages.includes(message)) {
                messages.push(message)
              }
            }
          })
        })
        messages.forEach((message) => {
          toast.error(message)
        })
      },
      onDrop,
      accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg']
      }
    })

  const file = watch(name)

  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    <section>
      <div
        {...getRootProps({
          style: {
            flex: '1',
            display: 'grid',
            placeContent: 'center',
            padding: '20px',
            borderRadius: '6px',
            borderWidth: '2px',
            borderStyle: 'dashed',
            borderColor: getBorderColor(isFocused, isDragAccept, isDragReject),
            backgroundColor: '#fafafa',
            color: '#bdbdbd',
            outline: 'none',
            transition: 'border .24s ease-in-out'
          }
        })}>
        <CiImageOn size='80px' className='mx-auto' />
        <input {...getInputProps()} />
        <p className='text-center'>Перетащите или выберите изображение</p>
      </div>
      <ErrorMessage
        as={<p className='text-red-400 text-sm' />}
        name={name}
        errors={errors}
      />
      {!!file && (
        <div className='mt-2'>
          <img
            className='w-48 h-48 mx-auto'
            src={URL.createObjectURL(file)}
            alt={file.name}
          />
        </div>
      )}
    </section>
  )
}
