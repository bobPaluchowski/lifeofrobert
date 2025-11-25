import React from 'react';

type ComponentDemoProps = {
    title: string;
    description: string;
    component: React.ReactNode;
    codeSnippet?: string;
};

const ComponentDemo: React.FC<ComponentDemoProps> = ({ title, description, component, codeSnippet }) => {
    return (
        <div style={{
            border: '1px solid #444',
            borderRadius: '12px',
            padding: '2rem',
            backgroundColor: 'var(--card-bg)',
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease-in-out',
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <h3 style={{ marginTop: 0, color: 'var(--primary-color)' }}>{title}</h3>
            <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>{description}</p>

            <div style={{
                padding: '2rem',
                border: '1px dashed #555',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#222',
                marginBottom: '1.5rem'
            }}>
                {component}
            </div>

            {codeSnippet && (
                <div style={{
                    backgroundColor: '#1a1a1a',
                    padding: '1rem',
                    borderRadius: '6px',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    color: '#888'
                }}>
                    <pre style={{ margin: 0 }}>{codeSnippet}</pre>
                </div>
            )}
        </div>
    );
};

export default ComponentDemo;
