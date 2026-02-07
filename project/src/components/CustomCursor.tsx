import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);
    
    const handleLinkHoverEvents = () => {
      const handleLinkMouseEnter = () => setLinkHovered(true);
      const handleLinkMouseLeave = () => setLinkHovered(false);
      
      const links = document.querySelectorAll('a, button, .cursor-pointer');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', handleLinkMouseEnter);
        link.addEventListener('mouseleave', handleLinkMouseLeave);
      });
      
      return () => {
        links.forEach(link => {
          link.removeEventListener('mouseenter', handleLinkMouseEnter);
          link.removeEventListener('mouseleave', handleLinkMouseLeave);
        });
      };
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    const cleanupLinkEvents = handleLinkHoverEvents();

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cleanupLinkEvents();
    };
  }, []);

  const cursorClasses = `
    fixed pointer-events-none z-50 mix-blend-difference
    transition-transform duration-300 ease-out will-change-transform
    ${hidden ? 'opacity-0' : 'opacity-100'}
    ${clicked ? 'scale-75' : ''}
    ${linkHovered ? 'scale-150' : ''}
  `;

  const cursorOuterStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '30px',
    height: '30px',
    transform: 'translate(-50%, -50%)',
  };

  const cursorInnerStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '8px',
    height: '8px',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <>
      <div 
        className={`${cursorClasses} rounded-full border-2 border-white bg-transparent`}
        style={cursorOuterStyle}
      />
      <div 
        className={`${cursorClasses} rounded-full bg-white`}
        style={cursorInnerStyle}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;