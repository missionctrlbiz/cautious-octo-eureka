import { useEffect, useRef } from 'react';
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox.css";

function FancyBox(props) {
  const delegate = props.delegate || "[data-fancybox]";
  const ref = useRef(null);

  useEffect(() => {
    const opts = props.options || {};
    const currentRef = ref.current;

    const instance = NativeFancybox.getInstance(currentRef);

    if (!instance) {
      NativeFancybox.bind(currentRef, opts);
    }

    return () => {
      const instance = NativeFancybox.getInstance(currentRef);
      if (instance) {
        instance.destroy();
      }
    };
  }, [delegate, props.options]);

  return (
    <div>
      {props.children}
    </div>
  )
}

export default FancyBox
