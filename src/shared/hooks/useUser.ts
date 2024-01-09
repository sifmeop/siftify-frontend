import { useUserStore } from '../store'

export const useUser = () => {
  return useUserStore((state) => state.user!)
}
