import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/boom')({
  component: PageComponent,
})

function PageComponent() {
  return (
    <div>
      <h1>boom</h1>
    </div>
  )
}
