# LEARN ALL ABOUT REACT HOOK

## Lesson One - useState

### Example 1: Click to inscrease number

### Example 2: Todo App

### Note

```javascript
const [name, setName] = useState(() => {
  // Dung callback trong truong hop can xu ly logic,
  // tranh de he thong xu ly nhieu lan
  return "Nguyen Trung Nguyen";
});
```

## Lesson Two - useEffect

### Example 1: get content from API

### Example 2: Go to Top

### Example 3: Resize window

```javascript
// Luon chay khi render
useEffect(callback);

// Chay 1 lan duy nhat sau khi component mount
useEffect(callback, []);

// Chay khi deps thay doi
useEffect(callback, [deps]);
```

### Example 4: Countdown

### Example 5: Upload IMG

### Example 6: Custom Window Event Emmit
