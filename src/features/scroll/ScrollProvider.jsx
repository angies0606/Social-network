import { ScrollContext } from './scroll.context';

function ScrollProvider({children, scrollableTargetId}) {
  return (
    <ScrollContext.Provider value={scrollableTargetId}>
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollProvider;