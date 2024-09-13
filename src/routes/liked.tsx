import { createFileRoute } from '@tanstack/react-router'
import Liked from '../pages/Liked'

export const Route = createFileRoute('/liked')({
  component: Liked
})