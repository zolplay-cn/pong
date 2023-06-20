import type { ButtonProps } from '@tremor/react'
import { Button as BaseButton } from '@tremor/react'
import { clsxm } from '@zolplay/utils'

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <BaseButton
      className={clsxm(
        'flex-none rounded-md !border-transparent bg-zinc-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-zinc-200 dark:hover:bg-zinc-200',
        className
      )}
      {...rest}
    >
      {children}
    </BaseButton>
  )
}
