import React, { useState } from 'react';
import ComponentDemo from '../components/Showcase/ComponentDemo';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import SearchBar from '../components/SearchBar/SearchBar';
import DropdownMenu from '../components/DropdownMenu/DropdownMenu';
import List from '../components/List/List';
import UniversalForm from '../components/Form/Form';
// Assuming other components exist based on directory structure, but I'll stick to what I've seen or can infer.
// I saw: Button, DropdownMenu, Form, List, Modal, SearchBar

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const dropdownItems = [
        { value: 'option1', label: 'Dashboard', icon: <span>📊</span> },
        { value: 'option2', label: 'Settings', icon: <span>⚙️</span> },
        { value: 'option3', label: 'Profile', icon: <span>👤</span> },
    ];

    const listItems = [
        { id: 1, title: 'React', description: 'A JavaScript library for building user interfaces' },
        { id: 2, title: 'TypeScript', description: 'Typed JavaScript at Any Scale' },
        { id: 3, title: 'Vite', description: 'Next Generation Frontend Tooling' },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem', padding: '4rem 0' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    UI Blocks
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '600px', margin: '0 auto' }}>
                    A showcase of my un-opinionated UI components library.
                    Built with React, TypeScript, and a focus on flexibility and design.
                </p>
                <div style={{ marginTop: '2rem' }}>
                    <Button
                        text="View on GitHub"
                        onClick={() => window.open('https://github.com/bobPaluchowski/UIBlocks', '_blank')}
                        backgroundColor="transparent"
                        style={{ border: '1px solid #555', color: '#aaa' }}
                        hoverColor="#fff"
                        hoverBoxShadow="0 0 10px rgba(255,255,255,0.1)"
                    />
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                <ComponentDemo
                    title="Button"
                    description="A versatile button component with support for various styles, sizes, and states."
                    component={
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button text="Primary" onClick={() => alert('Clicked!')} />
                            <Button text="Secondary" backgroundColor="var(--secondary-color)" color="#222" />
                            <Button text="Outline" backgroundColor="transparent" style={{ border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }} />
                        </div>
                    }
                    codeSnippet={`<Button text="Click Me" onClick={handleClick} />`}
                />

                <ComponentDemo
                    title="Modal"
                    description="A flexible modal dialog for displaying content overlays."
                    component={
                        <>
                            <Button text="Open Modal" onClick={() => setIsModalOpen(true)} backgroundColor="var(--accent-color)" color="#222" />
                            <Modal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                contentBgColor="var(--card-bg)"
                                style={{ color: 'var(--text-color)' }}
                            >
                                <h2 style={{ marginTop: 0 }}>Hello World!</h2>
                                <p>This is a demonstration of the Modal component.</p>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                    <Button text="Close" onClick={() => setIsModalOpen(false)} backgroundColor="#444" />
                                </div>
                            </Modal>
                        </>
                    }
                    codeSnippet={`<Modal isOpen={isOpen} onClose={close}>\n  <Content />\n</Modal>`}
                />

                <ComponentDemo
                    title="Search Bar"
                    description="A simple input field for search functionality."
                    component={
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <SearchBar
                                value={searchValue}
                                onChange={setSearchValue}
                                placeholder="Search components..."
                            />
                        </div>
                    }
                    codeSnippet={`<SearchBar value={val} onChange={setVal} />`}
                />

                <ComponentDemo
                    title="Dropdown Menu"
                    description="A customizable dropdown menu with support for icons and keyboard navigation."
                    component={
                        <div style={{ height: '150px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <DropdownMenu
                                items={dropdownItems}
                                onSelect={(item) => alert(`Selected: ${item.label}`)}
                                buttonLabel="Menu"
                                bgColor="#333"
                                textColor="#eee"
                                menuBgColor="var(--card-bg)"
                                itemStyle={{ color: 'var(--text-color)' }}
                            />
                        </div>
                    }
                    codeSnippet={`<DropdownMenu items={items} onSelect={handleSelect} />`}
                />

                <ComponentDemo
                    title="Form"
                    description="A dynamic form builder with validation support."
                    component={
                        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                            <UniversalForm
                                fields={[
                                    { name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'Enter username' },
                                    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter email' },
                                    { name: 'role', label: 'Role', type: 'select', options: [{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }] }
                                ]}
                                onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
                                style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px' }}
                                fieldStyle={{ marginBottom: '1rem' }}
                                submitLabel="Register"
                            />
                        </div>
                    }
                    codeSnippet={`<Form fields={fields} onSubmit={handleSubmit} />`}
                />

                <ComponentDemo
                    title="List"
                    description="A paginated list component with custom renderers."
                    component={
                        <div style={{ width: '100%' }}>
                            <List
                                items={listItems}
                                renderText={(item) => (
                                    <div>
                                        <div style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{item.description}</div>
                                    </div>
                                )}
                                renderIcon={() => <span style={{ fontSize: '1.2rem' }}>✨</span>}
                                bgColor="transparent"
                                textColor="var(--text-color)"
                                style={{ padding: 0 }}
                            />
                        </div>
                    }
                    codeSnippet={`<List items={data} renderText={renderItem} />`}
                />

            </div>
        </div>
    );
};

export default Home;
