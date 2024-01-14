import { useUploadTrackStore } from '#/shared/store'
import { UiLabel } from '#/shared/ui/ui-label'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Track } from './track'
import { MdOutlineAudiotrack } from 'react-icons/md'
import { Container, Draggable, DropResult } from 'react-smooth-dnd'
import { IUploadTrack } from '#/shared/store/upload-tracks'
import { generateRandomId } from '#/shared/lib'
import { useUser } from '#/shared/hooks'

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

const applyDrag = (tracks: IUploadTrack[], dragResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return tracks

  const result = [...tracks]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

interface Props {
  single?: boolean
}

export const DropzoneTracks = ({ single = false }: Props) => {
  const user = useUser()
  const { tracks, setTracks } = useUploadTrackStore()

  const onDrop = useCallback(
    (droppedFiles: File[]) => {
      const data: IUploadTrack[] = droppedFiles.map((file) => ({
        id: generateRandomId(),
        featuring: [
          {
            value: user.artist!.id,
            label: user.artist!.name,
            isFixed: true
          }
        ],
        title: '',
        track: file
      }))
      const allTracks = [...tracks, ...data]
      const value = single ? data : allTracks
      setTracks(value)
    },
    [tracks]
  )

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: single ? 1 : 30,
      onDrop,
      accept: {
        'audio/*': ['.mp3']
      }
    })

  return (
    <>
      <UiLabel>Треки</UiLabel>
      <section>
        <Container lockAxis='y' onDrop={(e) => setTracks(applyDrag(tracks, e))}>
          {tracks?.map((track, index) => (
            <Draggable key={track.id}>
              <Track data={track} trackIndex={index + 1} />
            </Draggable>
          ))}
        </Container>
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
          <MdOutlineAudiotrack size='80px' />
          <input {...getInputProps()} />
          <p>Перетащите или выберите аудио</p>
        </div>
      </section>
    </>
  )
}
