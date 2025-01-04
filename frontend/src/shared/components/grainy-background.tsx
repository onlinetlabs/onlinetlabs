export const GrainyBackground = ({ opacity = 0.06 }: Props) => {
  return (
    <div className="flex-none inset-0 pointer-events-none absolute z-10">
      <div className="w-full h-full bg-repeat" style={{ backgroundImage: `url('/mesh.png')`, opacity }} />
    </div>
  )
}

type Props = {
  opacity?: number
}