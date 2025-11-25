import React, { useRef, useState, useEffect } from 'react';

type DropdownMenuItem<T> = {
  value: T;
  label: string;
  icon?: React.ReactNode;
};

type DropdownMenuProps<T> = {
  items: DropdownMenuItem<T>[];
  onSelect: (item: DropdownMenuItem<T>) => void;
  style?: React.CSSProperties;
  menuStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  buttonLabel?: string;
  textColor?: string;
  bgColor?: string;
  iconColor?: string;
  menuBgColor?: string;
};

function DropdownMenu<T>({
  items,
  onSelect,
  style = {},
  menuStyle = {},
  itemStyle = {},
  buttonLabel = 'Select...',
  textColor = '#222',
  bgColor = '#fff',
  iconColor = '#888',
  menuBgColor = '#fff',
}: DropdownMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!open) {
      setFocusedIndex(-1);
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowDown')
        setFocusedIndex(f => (f + 1) % items.length);
      if (e.key === 'ArrowUp')
        setFocusedIndex(f => (f - 1 + items.length) % items.length);
      if (e.key === 'Enter' && focusedIndex >= 0) {
        onSelect(items[focusedIndex]);
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, items, focusedIndex, onSelect]);

  // Close on click outside 
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <button
        ref={btnRef}
        style={{
          background: bgColor,
          color: textColor,
          border: '1px solid #ccc',
          borderRadius: '6px',
          padding: '0.5em 1em',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {buttonLabel}
        <span style={{ marginLeft: '0.7em', color: iconColor }}>▼</span>
      </button>
      {open && (
        <ul
          ref={menuRef}
          tabIndex={-1}
          role="listbox"
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            zIndex: 10,
            background: menuBgColor,
            minWidth: '100%',
            margin: 0,
            padding: 0,
            boxShadow: '0 6px 24px rgba(0,0,0,0.09)',
            borderRadius: '8px',
            border: '1px solid #ddd',
            ...menuStyle,
          }}
        >
          {items.map((item, i) => (
            <li
              key={item.label + i}
              role="option"
              aria-selected={focusedIndex === i}
              onClick={() => {
                onSelect(item);
                setOpen(false);
              }}
              onMouseEnter={() => setFocusedIndex(i)}
              style={{
                padding: '0.5em 1.5em 0.5em 1em',
                color: textColor,
                background: focusedIndex === i ? '#f3f3fd' : menuBgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '1rem',
                ...itemStyle,
              }}
            >
              <span>{item.label}</span>
              {item.icon && (
                <span style={{ marginLeft: '18px', color: iconColor }}>
                  {item.icon}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
