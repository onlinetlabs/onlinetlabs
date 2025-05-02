export const GrainyBackground = ({ opacity = 0.06 }: Props) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex-none">
      <div
        className="h-full w-full bg-repeat"
        style={{ backgroundImage: `url('/mesh.png')`, opacity }}
      />
    </div>
  )
}

type Props = {
  opacity?: number
}
