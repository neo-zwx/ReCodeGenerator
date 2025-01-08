import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./modal.css";

const excodes = {
  step1: `
  public interface IDocument {
    void Display();
  }
     `,
  step2: `
  public class WordDocument : IDocument {
    public void Display() {
        Console.WriteLine("Show Word Document");
    }
  }

public class PdfDocument : IDocument {
    public void Display() {
        Console.WriteLine("Show Pdf Document");
    }
}`,
  step3: `
  public interface IDocumentFactory {
    IDocument CreateDocument();
}`,
  step4: `
  public class WordDocumentFactory : IDocumentFactory {
    public IDocument CreateDocument() {
        return new WordDocument();
    }
}

public class PdfDocumentFactory : IDocumentFactory {
    public IDocument CreateDocument() {
        return new PdfDocument();
    }
}  `,
  step5: `
class Program {
    static void Main(string[] args) {
        IDocumentFactory wordFactory = new WordDocumentFactory();
        IDocument wordDocument = wordFactory.CreateDocument();
        wordDocument.Display();

        IDocumentFactory pdfFactory = new PdfDocumentFactory();
        IDocument pdfDocument = pdfFactory.CreateDocument();
        pdfDocument.Display();
    }
} `,
};
const cdcodes = {
  step1: `
  public interface ILogger {
    void Log(string message);
} `,
  step2: `
  public class FileLogger : ILogger {
    public void Log(string message) {
        Console.WriteLine("Log to a file: " + message);
    }
}

public class DatabaseLogger : ILogger {
    public void Log(string message) {
        Console.WriteLine("Log to a database: " + message);
    }
}`,
  step3: `public interface ILoggerFactory {
    ILogger CreateLogger();
}`,
  step4: `public class FileLoggerFactory : ILoggerFactory {
    public ILogger CreateLogger() {
        // You can add more initialization code here.
        return new FileLogger();
    }
}

public class DatabaseLoggerFactory : ILoggerFactory {
    public ILogger CreateLogger() {
        // You can add more initialization code here.
        return new DatabaseLogger();
    }
}  `,
  step5: `class Program {
    static void Main(string[] args) {
        ILoggerFactory fileLoggerFactory = new FileLoggerFactory();
        ILogger fileLogger = fileLoggerFactory.CreateLogger();
        fileLogger.Log("This is a log message related to a file");

        ILoggerFactory databaseLoggerFactory = new DatabaseLoggerFactory();
        ILogger databaseLogger = databaseLoggerFactory.CreateLogger();
        databaseLogger.Log("This is a log message related to the database");
    }
} `,
};

const HTFactoryPattern = ({ onHide, show, state }) => {
  useEffect(() => {
    const updateModalPosition = () => {
      const modalElement = document.querySelector(".modal-dialog");
      if (modalElement) {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const modalHeight = modalElement.clientHeight;

        // 確保 modal 在可視範圍內並適當調整位置
        const topPosition = scrollY + (windowHeight - modalHeight) / 2;
        modalElement.style.top = `${
          topPosition > scrollY ? topPosition : scrollY + 20
        }px`;
      }
    };

    if (show) {
      updateModalPosition();
      window.addEventListener("resize", updateModalPosition);
    }

    return () => {
      window.removeEventListener("resize", updateModalPosition);
    };
  }, [show]);
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {state === "editing" ? "Introduce" : "介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Factory Pattern</h4>
        <p>
          Definition: To utilize shared technology to effectively support a
          large number of fine-grained objects.
        </p>
        <p>
        The Factory Pattern is a creational design pattern that provides an interface for creating objects, but lets subclasses decide which class to instantiate. This allows the instantiation of a class to be deferred to its subclasses.   
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/FactoryIma/FactoryClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1.<code>Product</code>Defines the public interface or abstract class of a product. All concrete products must implement this interface or inherit from this abstract class.
            </li>
            <li>
              2. <code>ConcreteProduct</code>classes implement the Product interface. Each concrete product has a different implementation logic.            </li>
            <li>
              3. <code>Factory</code>class provides a method to create instances of Product without explicitly specifying the concrete product class. The factory typically decides which type of product to create based on the input parameters.            </li>
            <li>
              4. <code>Client</code> uses the factory to create products. The client does not directly depend on the concrete product classes, but instead obtains product instances through the factory and relies on the Product interface.
            </li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const EXFactoryPattern = ({ onHide, show, state }) => {
  useEffect(() => {
    const updateModalPosition = () => {
      const modalElement = document.querySelector(".modal-dialog");
      if (modalElement) {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const modalHeight = modalElement.clientHeight;

        // 確保 modal 在可視範圍內並適當調整位置
        const topPosition = scrollY + (windowHeight - modalHeight) / 2;
        modalElement.style.top = `${
          topPosition > scrollY ? topPosition : scrollY + 20
        }px`;
      }
    };

    if (show) {
      updateModalPosition();
      window.addEventListener("resize", updateModalPosition);
    }

    return () => {
      window.removeEventListener("resize", updateModalPosition);
    };
  }, [show]);
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="EXFactoryPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Implementation steps for the Factory Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the product interface. </h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete product classes. </h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the factory interface. </h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Create concrete factory classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 5: Employ the Factory pattern.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step5}
                </code>
              </pre>
            </div>{" "}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CDFactoryPattern = ({ onHide, show, state }) => {
  useEffect(() => {
    const updateModalPosition = () => {
      const modalElement = document.querySelector(".modal-dialog");
      if (modalElement) {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const modalHeight = modalElement.clientHeight;

        // 確保 modal 在可視範圍內並適當調整位置
        const topPosition = scrollY + (windowHeight - modalHeight) / 2;
        modalElement.style.top = `${
          topPosition > scrollY ? topPosition : scrollY + 20
        }px`;
      }
    };

    if (show) {
      updateModalPosition();
      window.addEventListener("resize", updateModalPosition);
    }

    return () => {
      window.removeEventListener("resize", updateModalPosition);
    };
  }, [show]);
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="EXFactoryPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Factory Pattern Example</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the logger interface.</h3>
            <h5>
              To begin, we establish a logger interface to encapsulate the
              logging functionality.{" "}
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Create concrete logger classes. </h3>
            <h5>
              Next, create a concrete class for each type of logger that
              implements the logger interface.{" "}
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the logger factory interface</h3>
            <h5>
              Then, we define a logger factory interface, which declares a
              method for creating loggers.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Create concrete logger factory class</h3>
            <h5>
              Create a concrete factory class for each type of logger. These
              classes implement the logger factory interface and instantiate
              specific logger classes.{" "}
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 5: Use the Factory Pattern</h3>
            <h5>
            Create a logger instance through the logger factory interface without caring about the specific class of the logger.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step5}
                </code>
              </pre>
            </div>{" "}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { CDFactoryPattern, EXFactoryPattern, HTFactoryPattern };
