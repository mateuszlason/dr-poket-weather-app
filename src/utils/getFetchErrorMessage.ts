export const getFetchErrorMessage = (error: unknown) => {
  let msg: string
  if (error instanceof Error) msg = error.message
  else if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  )
    msg = error.message
  else if (typeof error === 'string') msg = error
  else msg = 'Unexpected error occurred. Please try again later'
  return msg
}
