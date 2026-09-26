'use client'

// Drop-in replacements for the lucide-react icons used across the site, backed by lucide-animated.
// Same names and props (className, strokeWidth), so `import { Heart } from '@/components/icons/lucide'`
// just works. Icons lucide-animated doesn't have map to the closest animated one.

import { cn } from '@/lib/utils'
import AnimatedIcon, { type AnimatedIconComponent } from './AnimatedIcon'
import { ArrowLeftIcon } from './arrow-left'
import { ArrowRightIcon } from './arrow-right'
import { BoxesIcon } from './boxes'
import { CartIcon } from './cart'
import { CheckIcon } from './check'
import { ChevronDownIcon } from './chevron-down'
import { ChevronLeftIcon } from './chevron-left'
import { ChevronRightIcon } from './chevron-right'
import { ClockIcon } from './clock'
import { EarthIcon } from './earth'
import { ExpandIcon } from './expand'
import { FeatherIcon } from './feather'
import { HandIcon } from './hand'
import { HandHeartIcon } from './hand-heart'
import { HeartIcon } from './heart'
import { InstagramIcon } from './instagram'
import { LayoutGridIcon } from './layout-grid'
import { LayoutPanelTopIcon } from './layout-panel-top'
import { LeafIcon } from './leaf'
import { MailCheckIcon } from './mail-check'
import { MapPinIcon } from './map-pin'
import { MenuIcon } from './menu'
import { MessageCircleMoreIcon } from './message-circle-more'
import { PhoneIcon } from './phone'
import { PlayIcon } from './play'
import { PlusIcon } from './plus'
import { RotateCCWIcon } from './rotate-ccw'
import { SearchIcon } from './search'
import { ShieldCheckIcon } from './shield-check'
import { SlidersHorizontalIcon } from './sliders-horizontal'
import { SparklesIcon } from './sparkles'
import { TruckIcon } from './truck'
import { UsersIcon } from './users'
import { XIcon } from './x'
import { YoutubeIcon } from './youtube'

export type IconProps = {
  className?: string
  strokeWidth?: number
  /** Fill the shape with the current colour (e.g. a "liked" heart, a play triangle) */
  filled?: boolean
  label?: string
}

const make = (icon: AnimatedIconComponent, name: string) => {
  const Component = ({ className, strokeWidth, filled, label }: IconProps) => (
    <AnimatedIcon
      icon={icon}
      label={label}
      strokeWidth={strokeWidth}
      className={cn(filled && '[&_svg]:fill-current', className)}
    />
  )
  Component.displayName = name
  return Component
}

export const ArrowLeft = make(ArrowLeftIcon, 'ArrowLeft')
export const ArrowRight = make(ArrowRightIcon, 'ArrowRight')
export const Check = make(CheckIcon, 'Check')
export const ChevronDown = make(ChevronDownIcon, 'ChevronDown')
export const ChevronLeft = make(ChevronLeftIcon, 'ChevronLeft')
export const ChevronRight = make(ChevronRightIcon, 'ChevronRight')
export const Clock = make(ClockIcon, 'Clock')
export const Expand = make(ExpandIcon, 'Expand')
export const Feather = make(FeatherIcon, 'Feather')
export const Hand = make(HandIcon, 'Hand')
export const HandHeart = make(HandHeartIcon, 'HandHeart')
export const Heart = make(HeartIcon, 'Heart')
export const Instagram = make(InstagramIcon, 'Instagram')
export const LayoutGrid = make(LayoutGridIcon, 'LayoutGrid')
export const LayoutPanelTop = make(LayoutPanelTopIcon, 'LayoutPanelTop')
export const Leaf = make(LeafIcon, 'Leaf')
export const MapPin = make(MapPinIcon, 'MapPin')
export const Menu = make(MenuIcon, 'Menu')
export const Phone = make(PhoneIcon, 'Phone')
export const Play = make(PlayIcon, 'Play')
export const Plus = make(PlusIcon, 'Plus')
export const RotateCcw = make(RotateCCWIcon, 'RotateCcw')
export const Search = make(SearchIcon, 'Search')
export const ShieldCheck = make(ShieldCheckIcon, 'ShieldCheck')
export const SlidersHorizontal = make(SlidersHorizontalIcon, 'SlidersHorizontal')
export const Sparkles = make(SparklesIcon, 'Sparkles')
export const Truck = make(TruckIcon, 'Truck')
export const Users = make(UsersIcon, 'Users')
export const X = make(XIcon, 'X')
export const Youtube = make(YoutubeIcon, 'Youtube')

// Closest animated equivalents for icons lucide-animated doesn't ship
export const AtSign = Instagram
export const Gift = make(BoxesIcon, 'Gift')
export const Globe = make(EarthIcon, 'Globe')
export const Mail = make(MailCheckIcon, 'Mail')
export const MessageCircle = make(MessageCircleMoreIcon, 'MessageCircle')
export const ShoppingBag = make(CartIcon, 'ShoppingBag')
export const Sprout = Leaf

// No animated version exists: re-exported static so imports stay in one place
export { List, Minus } from 'lucide-react'
