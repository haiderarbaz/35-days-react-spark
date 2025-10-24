# Day-07 of 35-Days-React-Spark

**Date:** 23/10/2025

**Topic:** Tailwind CSS and Props

**Resource:** ChaiCode YouTube Channel – Video 7

---

## 🎯 Learning Objectives

- Install and configure Tailwind CSS in a React project

- Style components using utility-first CSS approach

- Understand React Props and their importance

- Pass different data types as props

- Understand props destructuring and default values

- Build reusable components

- Complete React Foundation

---

## 📚 Table of Contents

1. [Tailwind CSS Setup](#1-tailwind-css-setup)
2. [Styling with Tailwind](#2-styling-with-tailwind)
3. [Understanding Props](#3-understanding-props)
4. [Passing Different Data Types](#4-passing-different-data-types)
5. [Props Destructuring](#5-props-destructuring)
6. [Default Props](#6-default-props)
7. [Component Reusability](#7-component-reusability)
8. [Best Practices](#8-best-practices)
9. [Common Patterns](#9-common-patterns)
10. [Interview Questions](#10-interview-questions)

---

## 1. Tailwind CSS Setup in Vite

### Step 1: Create your project

```bash
npm create vite@latest my-project -- --template-react
cd my-project
```

### Step 2: Install Tailwind

```bash
npm install tailwindcss @tailwindcss/vite
```

### Step 3: Configure the Vite plugin

Add the `@tailwindcss/vite plugin` to your Vite configuration.

```bash
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

### Step 4: Import Tailwind CSS

Add an `@import` to your CSS file that imports Tailwind CSS.

```bash
@import "tailwindcss";
```

### Step 5: Start your build process

```bash
npm run dev
```

#### Step 6: Verify Installation

Create a test component:

```jsx
function App() {
  return (
    <h1 className="text-3xl font-bold text-green-600 bg-black">
      Hello Tailwind!
    </h1>
  );
}
```

If the text is green, bold, large and background-color black - Tailwind is working.

**Now you can use Tailwind classes in your JSX! 🎉**

---

## 2. Styling with Tailwind

### 🎨 Utility-First CSS Approach

**Traditional CSS:**

```css
/* styles.css */
.card {
  padding: 1rem;
  margin: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

```jsx
<div className="card">Content</div>
```

**Tailwind CSS:**

```jsx
<div className="p-4 m-2 bg-white rounded-lg shadow-md">Content</div>
```

**Benefits:**

- No context switching between files

- No naming classes

- Faster development

- Smaller CSS bundle (purges unused styles)

---

### Building a Card Component

```jsx
function Card() {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Image */}
      <img
        className="w-full h-48 object-cover"
        src="https://via.placeholder.com/400"
        alt="Card image"
      />

      {/* Content */}
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">Card Title</h2>
        <p className="text-gray-700 text-base">
          This is a beautiful card component styled with Tailwind CSS.
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click Me
        </button>
      </div>
    </div>
  );
}
```

---

### Common Tailwind Classes Used

#### Layout

```jsx
// Flexbox
<div className="flex justify-center items-center">

// Grid
<div className="grid grid-cols-3 gap-4">

// Container
<div className="container mx-auto">
```

#### Spacing

```jsx
// Padding: p-4 = 1rem (16px)
<div className="p-4">        {/* All sides */}
<div className="px-6 py-4">  {/* Horizontal & Vertical */}
<div className="pt-2 pb-4">  {/* Top & Bottom */}

// Margin: m-2 = 0.5rem (8px)
<div className="m-2 mx-auto"> {/* Margin with auto horizontal */}
```

#### Colors

```jsx
// Background
<div className="bg-blue-500">      {/* Blue background */}
<div className="bg-gray-100">      {/* Light gray */}

// Text
<p className="text-white">         {/* White text */}
<p className="text-red-600">       {/* Red text */}
```

#### Typography

```jsx
<h1 className="text-3xl font-bold">     {/* Large, bold */}
<p className="text-sm text-gray-600">   {/* Small, gray */}
<span className="uppercase tracking-wide"> {/* Uppercase with spacing */}
```

#### Borders & Rounded Corners

```jsx
<div className="border-2 border-gray-300">  {/* 2px border */}
<div className="rounded-lg">                {/* Large rounded corners */}
<div className="rounded-full">              {/* Circular */}
```

#### Shadows

```jsx
<div className="shadow-sm">    {/* Small shadow */}
<div className="shadow-lg">    {/* Large shadow */}
<div className="shadow-xl">    {/* Extra large shadow */}
```

#### Hover Effects

```jsx
<button className="bg-blue-500 hover:bg-blue-700 hover:scale-105 transition">
  Hover Me
</button>
```

---

## 3. Understanding Props

### What are Props?

**Props** (short for "properties") are arguments passed into React components. They work like function parameters.

```jsx
// Parent Component
function App() {
  return <Greeting name="John" />;
}

// Child Component
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Output: Hello, John!
```

---

### Why Props?

**Without Props (Hard-coded):**

```jsx
function UserCard() {
  return (
    <div>
      <h2>John Doe</h2>
      <p>john@example.com</p>
    </div>
  );
}

// Need 3 users? Must create 3 separate components! ❌
```

**With Props (Reusable):**

```jsx
function UserCard({ name, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// Use same component 3 times with different data! ✅
<UserCard name="John Doe" email="john@example.com" />
<UserCard name="Jane Smith" email="jane@example.com" />
<UserCard name="Bob Wilson" email="bob@example.com" />
```

---

### Key Characteristics of Props

1. **Read-Only (Immutable)**

   ```jsx
   function Card(props) {
     props.name = "New Name"; // ❌ ERROR! Cannot modify props
     return <h1>{props.name}</h1>;
   }
   ```

2. **Unidirectional Data Flow**

   ```
   Parent Component
        ↓ (props)
   Child Component
        ↓ (props)
   Grandchild Component

   Data flows ONE WAY (top to bottom)
   ```

3. **Any Data Type**
   - Strings, numbers, booleans
   - Objects, arrays
   - Functions
   - JSX elements

---

## 4. Passing Different Data Types

### String Props

```jsx
// Passing
<Card title="My Card" />;

// Receiving
function Card({ title }) {
  return <h1>{title}</h1>;
}
```

---

### Number Props

```jsx
// Passing (use curly braces for non-strings)
<Card age={25} price={99.99} />;

// Receiving
function Card({ age, price }) {
  return (
    <div>
      <p>Age: {age}</p>
      <p>Price: ${price}</p>
    </div>
  );
}
```

---

### Boolean Props

```jsx
// Passing
<Card isActive={true} isPremium={false} />

// Shorthand for true
<Card isActive isPremium />

// Receiving
function Card({ isActive, isPremium }) {
  return (
    <div>
      {isActive && <span>Active</span>}
      {isPremium && <span>⭐ Premium</span>}
    </div>
  );
}
```

---

### Object Props

```jsx
// Passing
const user = {
  name: "John Doe",
  age: 25,
  email: "john@example.com",
};

<Card user={user} />;

// Receiving
function Card({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

---

### Array Props

```jsx
// Passing
const colors = ["red", "blue", "green"];
<Card colors={colors} />;

// Receiving
function Card({ colors }) {
  return (
    <ul>
      {colors.map((color, index) => (
        <li key={index} style={{ color: color }}>
          {color}
        </li>
      ))}
    </ul>
  );
}
```

---

### Function Props

```jsx
// Passing
function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return <Card onClick={handleClick} />;
}

// Receiving
function Card({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}
```

---

### JSX/Component Props (Children)

```jsx
// Passing content between tags
<Card>
  <h1>Title</h1>
  <p>This is the content</p>
</Card>;

// Receiving via special 'children' prop
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

---

## 5. Props Destructuring

### Without Destructuring

```jsx
function Card(props) {
  return (
    <div>
      <h2>{props.username}</h2>
      <p>{props.age}</p>
      <button>{props.btnText}</button>
    </div>
  );
}
```

**Problems:**

- Repetitive `props.` everywhere
- Less readable
- More typing

---

### With Destructuring (Recommended)

```jsx
function Card({ username, age, btnText }) {
  return (
    <div>
      <h2>{username}</h2>
      <p>{age}</p>
      <button>{btnText}</button>
    </div>
  );
}
```

**Benefits:**

- ✅ Cleaner code
- ✅ More readable
- ✅ Less typing
- ✅ Clear what props component uses

---

### Destructuring in Function Body

```jsx
function Card(props) {
  // Destructure inside function
  const { username, age, btnText } = props;

  return (
    <div>
      <h2>{username}</h2>
      <p>{age}</p>
      <button>{btnText}</button>
    </div>
  );
}
```

---

### Nested Destructuring

```jsx
// User object with nested address
function Card({
  user: {
    name,
    address: { city, country },
  },
}) {
  return (
    <div>
      <h2>{name}</h2>
      <p>
        {city}, {country}
      </p>
    </div>
  );
}

// Usage
<Card
  user={{
    name: "John",
    address: { city: "New York", country: "USA" },
  }}
/>;
```

---

## 6. Default Props

### Setting Default Values

```jsx
function Card({ username = "Guest", btnText = "Click Me", age = 0 }) {
  return (
    <div>
      <h2>{username}</h2>
      <p>Age: {age}</p>
      <button>{btnText}</button>
    </div>
  );
}
```

---

### Usage Examples

```jsx
// All props provided
<Card username="John" btnText="Visit Profile" age={25} />
// Output: John, Age: 25, Button: "Visit Profile"

// Some props missing
<Card username="Sarah" />
// Output: Sarah, Age: 0, Button: "Click Me"

// All props missing
<Card />
// Output: Guest, Age: 0, Button: "Click Me"
```

---

### Default Props (Old Method - Class Components)

```jsx
// Not commonly used with functional components
Card.defaultProps = {
  username: "Guest",
  btnText: "Click Me",
  age: 0,
};
```

---

### Handling Undefined vs Null

```jsx
function Card({ username = "Guest" }) {
  return <h1>{username}</h1>;
}

<Card username={undefined} />  // Uses default: "Guest" ✅
<Card username={null} />       // Shows nothing ⚠️
<Card username="" />           // Shows empty string ⚠️
```

**Better handling:**

```jsx
function Card({ username = "Guest" }) {
  const displayName = username || "Guest";
  return <h1>{displayName}</h1>;
}
```

---

## 7. Component Reusability

### The Power of Props

**One Component, Many Uses:**

```jsx
function UserCard({ name, role, image, btnText = "View Profile" }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
      <img className="w-24 h-24 rounded-full mx-auto" src={image} alt={name} />
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{role}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {btnText}
        </button>
      </div>
    </div>
  );
}
```

---

### Multiple Instances

```jsx
function App() {
  return (
    <div className="flex gap-4 p-8">
      <UserCard
        name="John Doe"
        role="Software Engineer"
        image="https://i.pravatar.cc/150?img=1"
        btnText="Hire Me"
      />

      <UserCard
        name="Jane Smith"
        role="Product Designer"
        image="https://i.pravatar.cc/150?img=2"
        btnText="View Portfolio"
      />

      <UserCard
        name="Bob Wilson"
        role="Marketing Manager"
        image="https://i.pravatar.cc/150?img=3"
        // Uses default btnText: "View Profile"
      />
    </div>
  );
}
```

---

### Real-World Example: Product Cards

```jsx
function ProductCard({ name, price, image, rating, inStock = true }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="mt-2 font-bold text-lg">{name}</h3>

      <div className="flex items-center gap-2 mt-1">
        <span className="text-yellow-500">★</span>
        <span>{rating}/5</span>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <span className="text-2xl font-bold">${price}</span>
        {inStock ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        ) : (
          <span className="text-red-500">Out of Stock</span>
        )}
      </div>
    </div>
  );
}

// Usage
function Shop() {
  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      <ProductCard
        name="Laptop"
        price={999}
        image="laptop.jpg"
        rating={4.5}
        inStock={true}
      />
      <ProductCard
        name="Mouse"
        price={29}
        image="mouse.jpg"
        rating={4.2}
        inStock={false}
      />
      <ProductCard
        name="Keyboard"
        price={79}
        image="keyboard.jpg"
        rating={4.8}
      />
    </div>
  );
}
```

---

## 8. Best Practices

### ✅ Do's

#### 1. Use Destructuring

```jsx
// ✅ Good
function Card({ title, description }) {
  return <div>{title}</div>;
}

// ❌ Avoid
function Card(props) {
  return <div>{props.title}</div>;
}
```

#### 2. Provide Default Values

```jsx
// ✅ Good - Handles missing props gracefully
function Button({ text = "Click", type = "button" }) {
  return <button type={type}>{text}</button>;
}
```

#### 3. Use PropTypes (Optional but Recommended)

```jsx
import PropTypes from "prop-types";

Card.propTypes = {
  title: PropTypes.string.isRequired,
  age: PropTypes.number,
  onClick: PropTypes.func,
};
```

#### 4. Keep Components Small and Focused

```jsx
// ✅ Good - Each component has one responsibility
function UserAvatar({ image, name }) {
  return <img src={image} alt={name} className="rounded-full" />;
}

function UserInfo({ name, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div>
      <UserAvatar image={user.image} name={user.name} />
      <UserInfo name={user.name} email={user.email} />
    </div>
  );
}
```

---

### ❌ Don'ts

#### 1. Never Modify Props

```jsx
// ❌ BAD - Props are read-only!
function Card({ title }) {
  title = title.toUpperCase(); // Don't do this!
  return <h1>{title}</h1>;
}

// ✅ GOOD - Create a new variable
function Card({ title }) {
  const upperTitle = title.toUpperCase();
  return <h1>{upperTitle}</h1>;
}
```

#### 2. Don't Use Index as Key in Dynamic Lists

```jsx
// ❌ BAD
{
  items.map((item, index) => <Card key={index} {...item} />);
}

// ✅ GOOD - Use unique ID
{
  items.map((item) => <Card key={item.id} {...item} />);
}
```

#### 3. Don't Pass Too Many Props

```jsx
// ❌ BAD - Too many individual props
<Card
  firstName="John"
  lastName="Doe"
  email="john@example.com"
  phone="123-456-7890"
  address="123 Main St"
  city="New York"
  country="USA"
/>;

// ✅ GOOD - Pass as object
const user = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  // ... other properties
};

<Card user={user} />;
```

---

## 9. Common Patterns

### Spread Operator for Props

```jsx
const cardData = {
  title: "My Card",
  description: "Card description",
  image: "card.jpg"
};

// Instead of:
<Card title={cardData.title} description={cardData.description} image={cardData.image} />

// Use spread:
<Card {...cardData} />
```

---

### Conditional Rendering with Props

```jsx
function Alert({ type, message }) {
  const colors = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800"
  };

  return (
    <div className={`p-4 rounded ${colors[type]}`}>
      {message}
    </div>
  );
}

// Usage
<Alert type="success" message="Operation successful!" />
<Alert type="error" message="Something went wrong!" />
```

---

### Props with Callbacks

```jsx
function SearchBox({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Call parent's function
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit">Search</button>
    </form>
  );
}

// Parent component
function App() {
  const handleSearch = (searchQuery) => {
    console.log("Searching for:", searchQuery);
    // Fetch data, update state, etc.
  };

  return <SearchBox onSearch={handleSearch} />;
}
```

---

### Render Props Pattern

```jsx
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading });
}

// Usage
<DataFetcher
  url="/api/users"
  render={({ data, loading }) =>
    loading ? <p>Loading...</p> : <UserList users={data} />
  }
/>;
```

---

## 10. Interview Questions

### Essential Questions & Answers

#### Q1: What are props in React?

**Answer:**
Props (properties) are arguments passed into React components, similar to function parameters. They allow data to flow from parent components to child components, enabling component reusability and dynamic content. Props are read-only and follow a unidirectional data flow.

---

#### Q2: Can you modify props inside a component?

**Answer:**
No, props are immutable (read-only). React enforces this to maintain predictable data flow. If you need to modify data within a component, you should use state instead. Props should only be read and used to render content or pass down to child components.

```jsx
// ❌ Wrong
function Card({ title }) {
  title = "New Title"; // Error!
  return <h1>{title}</h1>;
}

// ✅ Correct - Use state
function Card({ title }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  return <h1>{currentTitle}</h1>;
}
```

---

#### Q3: What's the difference between props and state?

**Answer:**

| Props                           | State                           |
| ------------------------------- | ------------------------------- |
| Passed from parent component    | Managed within the component    |
| Read-only (immutable)           | Mutable (via setState/useState) |
| Received as function parameters | Created and managed internally  |
| External data                   | Internal data                   |
| Cannot be changed by component  | Can be changed by component     |

---

#### Q4: How do you pass a function as a prop?

**Answer:**

```jsx
// Parent component
function Parent() {
  const handleClick = (data) => {
    console.log("Received:", data);
  };

  return <Child onButtonClick={handleClick} />;
}

// Child component
function Child({ onButtonClick }) {
  return <button onClick={() => onButtonClick("Hello")}>Click Me</button>;
}
```

---

#### Q5: What is props destructuring and why use it?

**Answer:**
Props destructuring is extracting specific properties from the props object directly in the function parameters.

```jsx
// Without destructuring
function Card(props) {
  return <h1>{props.title}</h1>;
}

// With destructuring (better)
function Card({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

**Benefits:**

- Cleaner, more readable code
- Less repetition
- Clear what props component expects
- Easier to set default values

---

#### Q6: What are default props?

**Answer:**
Default props provide fallback values when props are not passed by the parent component.

```jsx
function Button({ text = "Click Me", type = "button" }) {
  return <button type={type}>{text}</button>;
}

// If used without props:
<Button /> // Shows "Click Me"

// If used with props:
<Button text="Submit" /> // Shows "Submit"
```

---

#### Q7: What is the children prop?

**Answer:**
The `children` prop is a special prop that contains the content between opening and closing tags of a component.

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  <h1>Title</h1>
  <p>Content goes here</p>
</Card>;
```

---

#### Q8: Can you pass components as props?

**Answer:**
Yes! Components, JSX, and functions can all be passed as props.

```jsx
function Layout({ header, content, footer }) {
  return (
    <div>
      <header>{header}</header>
      <main>{content}</main>
      <footer>{footer}</footer>
    </div>
  );
}

// Usage
<Layout
  header={<h1>My App</h1>}
  content={<p>Main content</p>}
  footer={<p>© 2025</p>}
/>;
```

---

#### Q9: What happens if you don't pass a required prop?

**Answer:**
If a component expects a prop but doesn't receive it:

- Without default value: The prop will be `undefined`
- With PropTypes validation: You'll see a console warning
- The component may break if it tries to use undefined props

**Best Practice:**

```jsx
// Always provide defaults or check for existence
function Card({ title = "Untitled", user }) {
  if (!user) {
    return <div>No user data</div>;
  }
  return (
    <div>
      {title}: {user.name}
    </div>
  );
}
```

---

#### Q10: How do you validate props?

**Answer:**
Use PropTypes library for runtime type checking:

```jsx
import PropTypes from "prop-types";

function Card({ title, age, isActive, onClick }) {
  return <div>{title}</div>;
}

Card.propTypes = {
  title: PropTypes.string.isRequired, // Required string
  age: PropTypes.number, // Optional number
  isActive: PropTypes.bool, // Optional boolean
  onClick: PropTypes.func, // Optional function
};

Card.defaultProps = {
  age: 0,
  isActive: false,
};
```

---

## 🎉 React Foundation Completed!

### ✅ What You've Mastered:

1. **React Basics**

   - Components and JSX
   - File structure and setup

2. **Virtual DOM & Fiber**

   - How React updates UI efficiently
   - Reconciliation algorithm
   - Two-phase rendering

3. **Hooks**

   - useState for state management
   - Understanding re-renders

4. **Props**

   - Passing data between components
   - Component reusability
   - Different data types

5. **Styling**
   - Tailwind CSS integration
   - Utility-first approach
   - Responsive design

---

**Projects to Build:**

- Todo App with full CRUD
- Weather App with API
- E-commerce product listing
- Blog with routing
- Dashboard with charts

---

## 📝 Practice Exercises

### Exercise 1: Profile Card

Create a reusable ProfileCard component with:

- User image
- Name, title, email
- Social media links
- Custom button text
- Default values for optional props

### Exercise 2: Product Grid

Build a product listing with:

- Array of products passed as props
- ProductCard component
- Different styling based on inStock prop
- Click handler to add to cart

### Exercise 3: Form Components

Create reusable form components:

- Input component with label
- Button component with different variants
- Form wrapper component
- Pass validation props

---

## 📚 Additional Resources

### Official Documentation

- [React Props Documentation](https://react.dev/learn/passing-props-to-a-component)
- [Tailwind CSS Docs](https://tailwindcss.com)
