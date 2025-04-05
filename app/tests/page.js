import CodeBlock from "./CodeBlock";

export default function Home() {
    const sampleCode = `
      // This is a single-line comment
      const greet = (name) => {
        console.log(\`Hello, \${name}!\`); // Inline comment
      };

      /* 
        This is a 
        multi-line comment
      */
      greet("John");
    `;
  
    return (
      <div>
        <h1>Prism.js Syntax Highlighting</h1>
        <CodeBlock code={sampleCode} language="javascript" />
      </div>
    );
  }