type LayoutType = { children: React.ReactNode }

export const Layout = ({ children }: LayoutType) => {
  return (
    <main className="py-20 max-w-screen-xl mx-auto sm:px-5 lg:px-[30px] min-h-screen">
      {children}
    </main>
  )
}
