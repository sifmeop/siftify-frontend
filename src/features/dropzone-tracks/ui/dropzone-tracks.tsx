import { useUploadTrackStore } from '#/shared/store'
import { UiLabel } from '#/shared/ui/ui-label'
import { Divider } from '@mui/material'
import { Fragment, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { Track } from './track'

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

const name = 'tracks'

export const DropzoneTracks = () => {
  const { register, unregister, setValue, watch, getValues } = useFormContext()
  const { tracks, setTracks } = useUploadTrackStore()

  const onDrop = useCallback((droppedFiles: File[]) => {
    setTracks(droppedFiles)
    // setValue(name, allFiles, { shouldValidate: true })
  }, [])

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        'audio/*': ['.mp3']
      }
    })

  // const files = watch(name) as File[]

  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    <>
      <UiLabel>Треки</UiLabel>
      <section>
        {tracks?.map((file, index) => (
          <Fragment key={file.name}>
            <Track file={file} trackIndex={index + 1} />
            {index !== tracks.length - 1 && (
              <Divider
                sx={{
                  borderColor: 'gray',
                  my: 2
                }}
              />
            )}
          </Fragment>
        ))}
        <div
          {...getRootProps({
            style: {
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '6px',
              borderWidth: '2px',
              borderStyle: 'dashed',
              borderColor: getBorderColor(
                isFocused,
                isDragAccept,
                isDragReject
              ),
              backgroundColor: '#fafafa',
              color: '#bdbdbd',
              outline: 'none',
              transition: 'border .24s ease-in-out'
            }
          })}>
          <input {...getInputProps()} />
          <p>Перетащите или выберите аудио</p>
        </div>
      </section>
    </>
  )
}
