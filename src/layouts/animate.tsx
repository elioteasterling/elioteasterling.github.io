import { motion, useCycle } from 'framer-motion'
import { useEffect, useRef } from "react"

export const useDimensions = ref => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 1.25 + 100}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.25,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  function click(e) {
    e.preventDefault()
    if (isOpen) toggleOpen()
  }

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className="background" variants={sidebar}/>
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

const variants = {
    open: {
        x: 0,
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        x: -300,
        duration: 0.7,
        transition: { staggerChildren: 0.05, staggerDirection: -1, delayChildren: 0.125 }
    }
};
  
  export const Navigation = () => (
    <motion.div variants={variants}>
        <motion.ul>
        {colors.map((c, i) => (
            <MenuItem c={c} i={i} key={i} />
        ))}
        </motion.ul>
    </motion.div>
  );




  const mivs = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  }

  const saying = ["help pull,", "me out", "of the", "fire, before", "i die"]
  const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"]
  
  export const MenuItem = ({ c, i }) => {
    const style = { border: `2px solid ${c}` }
    return (
      <motion.li
        variants={mivs}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
            <span className="li-icon" style={style} >
                {(i + 1) * 10}
            </span>
            <span className="li-text" style={style} >
                {saying[i]}
            </span>
      </motion.li>
    )
  }

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
)

export const MenuToggle = ({ toggle }) => (
  <button onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open:   { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open:   { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
)