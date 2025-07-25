import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/welcome')({
  component: PageComponent,
})

function PageComponent() {
  return (
    <div>
      <h1>welcome</h1>
    </div>
  )
}
