import React, { useState } from 'react';

type ListType = 'unordered' | 'ordered';

type ListProps<T> = {
  items: T[];
  renderIcon: (item: T) => React.ReactNode; // Icon renderer for each item 
  renderText: (item: T) => React.ReactNode; // Text renderer for each item 
  listType?: ListType;                      // unordered or ordered 
  itemsPerPage?: number;
  textColor?: string;
  bgColor?: string;
  bulletStyle?: string;
  numberStyle?: string;
  style?: React.CSSProperties;
};

function Listcomponent<T>({
  items,
  renderIcon,
  renderText,
  listType = 'unordered',
  itemsPerPage = 10,
  textColor = '#222',
  bgColor = '#fff',
  bulletStyle = 'disc',
  numberStyle = 'decimal',
  style = {},
}: ListProps<T>) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const commonListStyles: React.CSSProperties = {
    background: bgColor,
    color: textColor,
    ...style,
  };

  const listStyles: React.CSSProperties = listType === 'unordered'
    ? { ...commonListStyles, listStyleType: bulletStyle, paddingLeft: '1.5em' }
    : { ...commonListStyles, listStyleType: numberStyle, paddingLeft: '1.5em' };

  return (
    <div>
      {listType === 'unordered' ? (
        <ul style={listStyles}>
          {paginatedItems.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '0.75em',
              }}
            >
              <span>{renderText(item)}</span>
              <span style={{ marginLeft: '1em' }}>{renderIcon(item)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ol style={listStyles}>
          {paginatedItems.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '0.75em'
              }}
            >
              <span>{renderText(item)}</span>
              <span style={{ marginLeft: '1em' }}>{renderIcon(item)}</span>
            </li>
          ))}
        </ol>
      )}
      <div style={{ textAlign: 'center', marginTop: '1em' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              margin: '0.25em',
              padding: '0.5em 1em',
              background: page === i + 1 ? '#eee' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              color: page === i + 1 ? textColor : '#999',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Listcomponent;
