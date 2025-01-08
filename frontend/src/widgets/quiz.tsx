'use client'
import { cn } from "@lib/utils"
import { Badge } from "@ui/badge"
import { Button } from "@ui/button"
import { QuizHeader, Quiz as QuizRoot, QuizTitle, QuizContent, QuizFooter, QuizHero, QuizHeroIcon, QuizHeroTitle, QuizHeroDescription, QuizOptions, QuizOptionIcon, QuizOption } from "@ui/quiz"
import { CheckIcon, CircleHelpIcon, MoveLeftIcon, XIcon } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] as const;

const SELECTED_FALLBACK = 0;

export const Quiz = ({
  question, 
  options,
  answer,
  hint, 
  explanation,
  hero = {
    title: 'Пришло время пройти тест!',
    description: 'Проверьте свои знания и посмотрите, чему вы только что научились.',
  }
}: Props) => {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const onSelect = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const onSubmit = () => {
    const status = selected === (answer - 1) ? 'correct' : 'incorrect';

    if (status === 'correct') {
      markQuestionAsAnswered();
    }

    setStatus(status);
  }

  const onReset = () => {
    setSelected(null);
    setStatus('idle');
  }

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('quiz') as string) || [];
    if (savedQuestions.includes(question)) {
      setStatus('correct');
    }

    setMounted(true);
  }, [question]);

  const markQuestionAsAnswered = () => {
    const savedQuestions = JSON.parse(localStorage.getItem('quiz') as string) || [];
    if (!savedQuestions.includes(question)) {
      savedQuestions.push(question);
      localStorage.setItem('quiz', JSON.stringify(savedQuestions));
    }
  };

  if (!mounted) {
    return (
      <QuizRoot className="min-h-[640px] w-full" />
    )
  }

  return (
    <QuizRoot>
      <QuizHero>
        <QuizHeroIcon>
          <CircleHelpIcon className="h-8 w-8 text-white" />
        </QuizHeroIcon>
        <QuizHeroTitle>
          {hero.title}
        </QuizHeroTitle>
        <QuizHeroDescription>
          <p className="pt-2 text-sm text-muted-foreground">{hero.description}</p>
        </QuizHeroDescription>
      </QuizHero>

      <QuizContent>
        <QuizHeader>
          <QuizTitle>{question}</QuizTitle>
        </QuizHeader>
        <QuizOptions className={cn({"flex w-full flex-1 flex-col items-center justify-center rounded-lg border p-8": status !== 'idle'})}>
          {status === 'idle' && (
            <>
              {options.map((option, idx) => (
                <QuizOption key={idx} onClick={() => onSelect(idx)} selected={selected === idx}>
                  <QuizOptionIcon>{LETTERS[idx]}</QuizOptionIcon>
                  {option}
                </QuizOption>
              ))}
            </>
          )}
          {status === 'incorrect' && (
            <>
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                {LETTERS[selected || SELECTED_FALLBACK]}
              </div>
              <p className="text-sm text-primary">{options[selected || SELECTED_FALLBACK]}</p>
              <Badge variant="destructive" className="gap-1 my-6 h-8 px-3 pointer-events-none">
                <XIcon className="h-4 w-4" />
                Не совсем
              </Badge>
              {hint && <p className="mx-auto max-w-96 w-full text-sm text-muted-foreground text-center">Подсказка: {hint}</p>}
            </>
          )}
          {status === 'correct' && (
            <>
              <QuizOptionIcon className="mb-2 flex h-8 w-8 items-center justify-center rounded-full">
                {LETTERS[selected || SELECTED_FALLBACK]}
              </QuizOptionIcon>
              <p className="text-sm text-primary">{options[selected || SELECTED_FALLBACK]}</p>
              <Badge variant="success" className="gap-1 my-6 h-8 px-3 pointer-events-none">
                <CheckIcon className="h-4 w-4" />
                Правильно
              </Badge>
              {explanation && <p className="mx-auto max-w-96 w-full text-sm text-muted-foreground text-center">{explanation}</p>}
            </>
          )}
        </QuizOptions>
        <QuizFooter className={cn({ "justify-center": status === 'incorrect' })}>
          {status === 'idle' && (
            <Button className="w-full md:w-fit" onClick={onSubmit}>Проверить Ответ</Button>
          )}
          {status === 'incorrect' && (
            <Button variant="outline" className="w-full md:w-fit" onClick={onReset}>
              <MoveLeftIcon className="h-4 w-4" />
              Попробовать Снова
            </Button>
          )}
        </QuizFooter>
      </QuizContent>
    </QuizRoot>
  )
}

type Props = {
  question: string;
  options: string[];
  answer: number;
  hint?: string;
  explanation?: string;
  hero?: {
    title?: string;
    description?: string;
  }
}