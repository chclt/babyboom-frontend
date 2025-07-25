import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: PageComponent,
})

function PageComponent() {
  return (
    <div>
      <h1>memories</h1>
    </div>
  )
}
