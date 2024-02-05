export const handleOpenWeatherApiError = async (res: Response) => {
  if (!res.ok) {
    if (res.headers.get('content-type')?.includes('application/json')) {
      const errorObject = await res.json()
      throw errorObject
    } else {
      throw new Error('An unexpected error occurred. Please try again later.')
    }
  }
}
