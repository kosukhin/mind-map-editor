# Порядок слоев

Application - знает о: application | entities    | integration | system
Integration - знает о: integration | system
Entities    - знает о: entities
System      - знает о: system

## Расшифровка

Application - Содержит объекты управляющие поведением приложения.

Integration - содержит объекты для интеграции системы с каким-то существующим ПО.

Entities - содержит описания типов данных текущего приложения, этот слой нужен
непосредственно для Application, только Application работает с этими типами.

System - содержит системные типы и логику на которых основано приложение.
