
const Details = ({visible}) => {
  return (
    <div className={`h-[98vh] p-3 shadow-xl rounded-xl bg-zinc-200/10 dark:bg-zinc-800/40 backdrop-blur-30 transition-all duration-700 ${visible?"w-full":"w-0 opacity-0"}`}>Details</div>
  )
}

export default Details